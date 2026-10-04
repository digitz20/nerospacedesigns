"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

type Tab = "projects" | "email" | "settings";

interface Project {
  id: string;
  title: string;
  location: string;
  category: string;
  year: string;
  description: string;
  images: string[];
  aspectRatio: string;
  clientName?: string;
  projectSize?: string;
  budgetRange?: string;
  timeline?: string;
  status?: string;
  featured?: boolean;
}

interface Settings {
  contact: { email: string; phone: string; location: string };
  social: {
    instagram: string;
    pinterest: string;
    whatsapp: string;
    tiktok: string;
    twitter: string;
    facebook: string;
  };
  siteName: string;
  tagline: string;
}

function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

async function api<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error((data as { error?: string }).error || "API error");
  }
  return res.json();
}

function AdminNav({
  tab,
  setTab,
  onLogout,
}: {
  tab: Tab;
  setTab: (t: Tab) => void;
  onLogout: () => void;
}) {
  const tabs: { key: Tab; label: string }[] = [
    { key: "projects", label: "Projects" },
    { key: "email", label: "Send Email" },
    { key: "settings", label: "Settings" },
  ];

  return (
    <nav className="border-b border-beige-medium/20">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 className="font-heading text-xl text-beige-light font-bold uppercase tracking-wider pt-4 pb-2">
            Admin
          </h1>
          <div className="flex gap-1">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={cn(
                  "text-xs tracking-[0.15em] uppercase font-semibold py-4 px-2 transition-colors",
                  tab === t.key
                    ? "text-beige-light border-b-2 border-coffee-accent"
                    : "text-beige-medium hover:text-beige-light"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={onLogout}
          className="text-xs tracking-[0.15em] uppercase font-semibold text-beige-medium hover:text-beige-light transition-colors py-4"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

function Toast({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 px-6 py-3 text-sm font-heading z-50 shadow-lg",
        type === "success"
          ? "bg-beige-light text-coffee-dark"
          : "bg-red-500 text-white"
      )}
    >
      {message}
    </div>
  );
}

function ProjectManager({
  onToast,
}: {
  onToast: (message: string, type: "success" | "error") => void;
}) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [adminPage, setAdminPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const formInit = {
    title: "",
    location: "",
    category: "Residential",
    year: new Date().getFullYear().toString(),
    description: "",
    images: [] as string[],
    aspectRatio: "aspect-[4/5]",
    clientName: "",
    projectSize: "",
    budgetRange: "",
    timeline: "",
    status: "Planning",
    featured: false,
  };
  const [form, setForm] = useState(formInit);

  const loadProjects = useCallback(async (pageNum: number) => {
    try {
      const data = await api<{ projects: Project[]; page: number; totalPages: number }>("/api/projects?page=" + pageNum);
      setProjects(data.projects);
      setAdminPage(data.page);
      setTotalPages(data.totalPages);
    } catch {
      onToast("Failed to load projects", "error");
    } finally {
      setLoading(false);
    }
  }, [onToast]);

  useEffect(() => {
    loadProjects(1);
  }, [loadProjects]);

  const resetForm = () => {
    setForm({
      title: "",
      location: "",
      category: "Residential",
      year: new Date().getFullYear().toString(),
      description: "",
      images: [],
      aspectRatio: "aspect-[4/5]",
      clientName: "",
      projectSize: "",
      budgetRange: "",
      timeline: "",
      status: "Planning",
      featured: false,
    });
    setEditing(null);
    setShowForm(false);
  };

  const handleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const fd = new FormData();
        fd.set("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        if (!res.ok) throw new Error("Upload failed");
        return res.json();
      });
      const results = await Promise.all(uploadPromises);
      setForm((prev) => ({
        ...prev,
        images: [...prev.images, ...results.map((r) => r.url)],
      }));
      onToast("Images uploaded", "success");
    } catch {
      onToast("Upload failed", "error");
    } finally {
      setUploading(false);
    }
  };

  const refreshProjects = useCallback(() => {
    try {
      sessionStorage.setItem("lastProjectUpdate", Date.now().toString());
    } catch {
      // ignore storage errors
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await api(`/api/projects/${editing.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ project: form }),
        });
        onToast("Project updated", "success");
      } else {
        await api("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ project: form }),
        });
        onToast("Project created", "success");
      }
      refreshProjects();
      await loadProjects(editing ? adminPage : 1);
      resetForm();
    } catch {
      onToast("Failed to save project", "error");
    }
  };

  const handleEdit = (project: Project) => {
    setForm({
      title: project.title,
      location: project.location,
      category: project.category,
      year: project.year,
      description: project.description,
      images: [...project.images],
      aspectRatio: project.aspectRatio,
      clientName: project.clientName || "",
      projectSize: project.projectSize || "",
      budgetRange: project.budgetRange || "",
      timeline: project.timeline || "",
      status: project.status || "Planning",
      featured: project.featured || false,
    });
    setEditing(project);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await api(`/api/projects/${id}`, { method: "DELETE" });
      onToast("Project deleted", "success");
      refreshProjects();
      await loadProjects(adminPage);
    } catch {
      onToast("Failed to delete project", "error");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-coffee-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl text-beige-light font-bold uppercase">
            Projects Management
          </h2>
          <p className="text-beige-medium text-sm mt-1">
            {projects.length} project(s) total
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
          className="bg-coffee-accent text-beige-light px-6 py-2.5 text-xs tracking-[0.15em] uppercase font-semibold hover:bg-beige-warm hover:text-coffee-dark transition-colors"
        >
          {showForm ? "Cancel" : "+ New Project"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="border border-beige-medium/20 p-6 space-y-5"
        >
          <h3 className="font-heading text-lg text-beige-light font-bold uppercase">
            {editing ? "Edit Project" : "New Project"}
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-beige-medium text-xs tracking-widest uppercase mb-1.5 font-semibold">
                Project Title *
              </label>
              <input
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                required
                className="w-full bg-coffee-dark border border-beige-medium/30 text-beige-light px-3 py-2 text-sm font-heading focus:border-beige-medium focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-beige-medium text-xs tracking-widest uppercase mb-1.5 font-semibold">
                Client Name
              </label>
              <input
                value={form.clientName}
                onChange={(e) =>
                  setForm({ ...form, clientName: e.target.value })
                }
                className="w-full bg-coffee-dark border border-beige-medium/30 text-beige-light px-3 py-2 text-sm font-heading focus:border-beige-medium focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-beige-medium text-xs tracking-widest uppercase mb-1.5 font-semibold">
                Location
              </label>
              <input
                value={form.location}
                onChange={(e) =>
                  setForm({ ...form, location: e.target.value })
                }
                className="w-full bg-coffee-dark border border-beige-medium/30 text-beige-light px-3 py-2 text-sm font-heading focus:border-beige-medium focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-beige-medium text-xs tracking-widest uppercase mb-1.5 font-semibold">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
                className="w-full bg-coffee-dark border border-beige-medium/30 text-beige-light px-3 py-2 text-sm font-heading focus:border-beige-medium focus:outline-none"
              >
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Hospitality">Hospitality</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-beige-medium text-xs tracking-widest uppercase mb-1.5 font-semibold">
                Year
              </label>
              <input
                value={form.year}
                onChange={(e) =>
                  setForm({ ...form, year: e.target.value })
                }
                className="w-full bg-coffee-dark border border-beige-medium/30 text-beige-light px-3 py-2 text-sm font-heading focus:border-beige-medium focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-beige-medium text-xs tracking-widest uppercase mb-1.5 font-semibold">
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value })
                }
                className="w-full bg-coffee-dark border border-beige-medium/30 text-beige-light px-3 py-2 text-sm font-heading focus:border-beige-medium focus:outline-none"
              >
                <option value="Planning">Planning</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="On Hold">On Hold</option>
              </select>
            </div>
            <div>
              <label className="block text-beige-medium text-xs tracking-widest uppercase mb-1.5 font-semibold">
                Project Size
              </label>
              <input
                value={form.projectSize}
                onChange={(e) =>
                  setForm({ ...form, projectSize: e.target.value })
                }
                placeholder="e.g. 250 sqm"
                className="w-full bg-coffee-dark border border-beige-medium/30 text-beige-light px-3 py-2 text-sm font-heading focus:border-beige-medium focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-beige-medium text-xs tracking-widest uppercase mb-1.5 font-semibold">
                Budget Range
              </label>
              <input
                value={form.budgetRange}
                onChange={(e) =>
                  setForm({ ...form, budgetRange: e.target.value })
                }
                placeholder="e.g. ₦50M - ₦100M"
                className="w-full bg-coffee-dark border border-beige-medium/30 text-beige-light px-3 py-2 text-sm font-heading focus:border-beige-medium focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-beige-medium text-xs tracking-widest uppercase mb-1.5 font-semibold">
                Timeline
              </label>
              <input
                value={form.timeline}
                onChange={(e) =>
                  setForm({ ...form, timeline: e.target.value })
                }
                placeholder="e.g. 6 months"
                className="w-full bg-coffee-dark border border-beige-medium/30 text-beige-light px-3 py-2 text-sm font-heading focus:border-beige-medium focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="featured"
                checked={form.featured}
                onChange={(e) =>
                  setForm({ ...form, featured: e.target.checked })
                }
                className="w-4 h-4 accent-coffee-accent"
              />
              <label htmlFor="featured" className="text-beige-light text-sm font-heading">
                Featured Project
              </label>
            </div>
            <div className="md:col-span-2">
              <label className="block text-beige-medium text-xs tracking-widest uppercase mb-1.5 font-semibold">
                Aspect Ratio
              </label>
              <select
                value={form.aspectRatio}
                onChange={(e) =>
                  setForm({ ...form, aspectRatio: e.target.value })
                }
                className="w-full bg-coffee-dark border border-beige-medium/30 text-beige-light px-3 py-2 text-sm font-heading focus:border-beige-medium focus:outline-none"
              >
                <option value="aspect-[4/5]">4:5 Portrait</option>
                <option value="aspect-square">1:1 Square</option>
                <option value="aspect-[16/9]">16:9 Wide</option>
                <option value="aspect-[3/4]">3:4 Portrait</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-beige-medium text-xs tracking-widest uppercase mb-1.5 font-semibold">
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={4}
                className="w-full bg-coffee-dark border border-beige-medium/30 text-beige-light px-3 py-2 text-sm font-heading focus:border-beige-medium focus:outline-none resize-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-beige-medium text-xs tracking-widest uppercase mb-1.5 font-semibold">
                Project Images
              </label>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                className="hidden"
                id="project-images"
                onChange={(e) => handleImageUpload(e.target.files)}
              />
              <button
                type="button"
                onClick={() =>
                  document.getElementById("project-images")?.click()
                }
                disabled={uploading}
                className="text-xs tracking-[0.15em] uppercase font-semibold text-beige-medium border border-beige-medium/30 px-4 py-2 hover:border-beige-medium hover:text-beige-light transition-colors disabled:opacity-50"
              >
                {uploading ? "Uploading..." : "+ Upload Images"}
              </button>
              {form.images.length > 0 && (
                <div className="flex gap-2 mt-3 flex-wrap">
                  {form.images.map((url, i) => (
                    <div key={i} className="relative w-20 h-20 border border-beige-medium/30">
                      <img
                        src={url}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setForm((prev) => ({
                            ...prev,
                            images: prev.images.filter(
                              (_, idx) => idx !== i
                            ),
                          }))
                        }
                        className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-coffee-accent text-beige-light px-8 py-2.5 text-xs tracking-[0.2em] uppercase font-semibold hover:bg-beige-warm hover:text-coffee-dark transition-colors"
            >
              {editing ? "Update" : "Create"} Project
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="text-beige-medium text-xs tracking-[0.2em] uppercase font-semibold hover:text-beige-light transition-colors px-4 py-2.5"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="border border-beige-medium/20 p-5 flex flex-col sm:flex-row gap-4 items-start"
          >
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 flex-1">
              {project.images.slice(0, 3).map((url, i) => (
                <div
                  key={i}
                  className="w-24 h-24 flex-shrink-0 border border-beige-medium/20"
                >
                  <img
                    src={url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-heading text-lg text-beige-light font-bold uppercase truncate">
                {project.title}
              </h3>
              <p className="text-beige-medium text-sm mt-1">
                {project.location} &middot; {project.category} &middot;{" "}
                {project.year}
              </p>
              <p className="text-beige-medium/70 text-sm mt-2 line-clamp-2 font-heading">
                {project.description}
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => handleEdit(project)}
                className="text-xs tracking-[0.15em] uppercase font-semibold text-coffee-accent hover:text-beige-light border border-coffee-accent/30 px-4 py-2 hover:border-coffee-accent transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(project.id)}
                className="text-xs tracking-[0.15em] uppercase font-semibold text-red-400 hover:text-red-300 border border-red-400/30 px-4 py-2 hover:border-red-400 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 pt-6">
          <button
            onClick={() => loadProjects(adminPage - 1)}
            disabled={adminPage <= 1}
            className="text-xs tracking-[0.2em] uppercase font-semibold text-coffee-accent hover:text-coffee-dark disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ← Previous
          </button>
          <span className="text-sm text-coffee-dark font-heading">
            Page {adminPage} of {totalPages}
          </span>
          <button
            onClick={() => loadProjects(adminPage + 1)}
            disabled={adminPage >= totalPages}
            className="text-xs tracking-[0.2em] uppercase font-semibold text-coffee-accent hover:text-coffee-dark disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

function EmailManager({
  onToast,
}: {
  onToast: (message: string, type: "success" | "error") => void;
}) {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const recipients = to
        .split(/[,\n;]+/)
        .map((email) => email.trim())
        .filter((email) => email.length > 0 && email.includes("@"));

      if (recipients.length === 0) {
        onToast("Please enter at least one valid email address", "error");
        setSending(false);
        return;
      }

      const res = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: recipients,
          subject,
          message,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to send emails");
      }

      onToast(data.message || `Sent ${recipients.length} email(s) successfully`, "success");
      setTo("");
      setSubject("");
      setMessage("");
    } catch {
      onToast("Failed to send emails. Please check email configuration.", "error");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h2 className="font-heading text-2xl text-beige-light font-bold uppercase">
          Send Email
        </h2>
        <p className="text-beige-medium text-sm mt-1">
          Send emails to multiple recipients at once. Separate emails with commas, new lines, or semicolons.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-beige-medium text-xs tracking-widest uppercase mb-1.5 font-semibold">
            To (Email Addresses)
          </label>
          <textarea
            value={to}
            onChange={(e) => setTo(e.target.value)}
            rows={4}
            placeholder="client1@example.com, client2@example.com&#10;client3@example.com"
            className="w-full bg-coffee-dark border border-beige-medium/30 text-beige-light px-3 py-2 text-sm font-heading focus:border-beige-medium focus:outline-none resize-none"
            required
          />
          <p className="text-beige-medium/60 text-xs mt-1">Separate multiple emails with commas, new lines, or semicolons</p>
        </div>

        <div>
          <label className="block text-beige-medium text-xs tracking-widest uppercase mb-1.5 font-semibold">
            Subject
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Your project is ready for review"
            className="w-full bg-coffee-dark border border-beige-medium/30 text-beige-light px-3 py-2 text-sm font-heading focus:border-beige-medium focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-beige-medium text-xs tracking-widest uppercase mb-1.5 font-semibold">
            Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={10}
            placeholder="Dear Client,&#10;&#10;We are pleased to inform you that...&#10;&#10;Best regards,&#10;Nerospace Designs"
            className="w-full bg-coffee-dark border border-beige-medium/30 text-beige-light px-3 py-2 text-sm font-heading focus:border-beige-medium focus:outline-none resize-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={sending}
          className="bg-coffee-accent text-beige-light px-8 py-3 text-xs tracking-[0.2em] uppercase font-semibold hover:bg-beige-warm hover:text-coffee-dark transition-colors disabled:opacity-50"
        >
          {sending ? "Sending..." : "Send Emails"}
        </button>
      </form>

      <div className="border-t border-beige-medium/20 pt-8">
        <h3 className="font-heading text-lg text-beige-light font-bold uppercase mb-4">Quick Templates</h3>
        <div className="grid gap-3">
          <button
            type="button"
            onClick={() => {
              setSubject("Your project update from Nerospace Designs");
              setMessage("Dear Client,\n\nWe wanted to update you on the progress of your project. Our team is working diligently to bring your vision to life.\n\nWe will keep you informed at every stage.\n\nBest regards,\nNerospace Designs");
            }}
            className="text-left text-xs text-beige-medium hover:text-beige-light border border-beige-medium/20 px-4 py-3 transition-colors font-heading"
          >
            Project Update
          </button>
          <button
            type="button"
            onClick={() => {
              setSubject("Ready to start your next project?");
              setMessage("Dear Client,\n\nWe hope this email finds you well. We are currently accepting new projects and would love to discuss how we can bring your vision to life.\n\nGet in touch with us to schedule a consultation.\n\nBest regards,\nNerospace Designs");
            }}
            className="text-left text-xs text-beige-medium hover:text-beige-light border border-beige-medium/20 px-4 py-3 transition-colors font-heading"
          >
            New Project Inquiry
          </button>
          <button
            type="button"
            onClick={() => {
              setSubject("Thank you for your consultation");
              setMessage("Dear Client,\n\nThank you for taking the time to meet with us. We enjoyed discussing your project and exploring the possibilities.\n\nWe will be in touch soon with our proposal.\n\nBest regards,\nNerospace Designs");
            }}
            className="text-left text-xs text-beige-medium hover:text-beige-light border border-beige-medium/20 px-4 py-3 transition-colors font-heading"
          >
            Post-Consultation Follow-up
          </button>
        </div>
      </div>
    </div>
  );
}

function SettingsManager({
  onToast,
}: {
  onToast: (message: string, type: "success" | "error") => void;
}) {
  const [settings, setSettings] = useState<Settings>({
    contact: { email: "", phone: "", location: "" },
    social: {
      instagram: "",
      pinterest: "",
      whatsapp: "",
      tiktok: "",
      twitter: "",
      facebook: "",
    },
    siteName: "",
    tagline: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api<{ settings: Settings }>("/api/settings")
      .then((data) => {
        if (data.settings) setSettings(data.settings);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings }),
      });
      onToast("Settings saved successfully", "success");
    } catch {
      onToast("Failed to save settings", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-coffee-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-heading text-2xl text-beige-light font-bold uppercase">
          Site Settings
        </h2>
        <p className="text-beige-medium text-sm mt-1">
          Update contact info and social links
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8 max-w-2xl">
        <div className="space-y-5">
          <h3 className="font-heading text-lg text-beige-light font-bold uppercase border-b border-beige-medium/20 pb-2">
            General
          </h3>
          <div>
            <label className="block text-beige-medium text-xs tracking-widest uppercase mb-1.5 font-semibold">
              Site Name
            </label>
            <input
              value={settings.siteName}
              onChange={(e) =>
                setSettings({ ...settings, siteName: e.target.value })
              }
              className="w-full bg-coffee-dark border border-beige-medium/30 text-beige-light px-3 py-2 text-sm font-heading focus:border-beige-medium focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-beige-medium text-xs tracking-widest uppercase mb-1.5 font-semibold">
              Tagline
            </label>
            <input
              value={settings.tagline}
              onChange={(e) =>
                setSettings({ ...settings, tagline: e.target.value })
              }
              className="w-full bg-coffee-dark border border-beige-medium/30 text-beige-light px-3 py-2 text-sm font-heading focus:border-beige-medium focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-5">
          <h3 className="font-heading text-lg text-beige-light font-bold uppercase border-b border-beige-medium/20 pb-2">
            Contact Info
          </h3>
          <div>
            <label className="block text-beige-medium text-xs tracking-widest uppercase mb-1.5 font-semibold">
              Email
            </label>
            <input
              type="email"
              value={settings.contact.email}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  contact: { ...settings.contact, email: e.target.value },
                })
              }
              className="w-full bg-coffee-dark border border-beige-medium/30 text-beige-light px-3 py-2 text-sm font-heading focus:border-beige-medium focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-beige-medium text-xs tracking-widest uppercase mb-1.5 font-semibold">
              Phone
            </label>
            <input
              value={settings.contact.phone}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  contact: { ...settings.contact, phone: e.target.value },
                })
              }
              className="w-full bg-coffee-dark border border-beige-medium/30 text-beige-light px-3 py-2 text-sm font-heading focus:border-beige-medium focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-beige-medium text-xs tracking-widest uppercase mb-1.5 font-semibold">
              Location / Address
            </label>
            <textarea
              value={settings.contact.location}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  contact: {
                    ...settings.contact,
                    location: e.target.value,
                  },
                })
              }
              rows={2}
              className="w-full bg-coffee-dark border border-beige-medium/30 text-beige-light px-3 py-2 text-sm font-heading focus:border-beige-medium focus:outline-none resize-none"
            />
          </div>
        </div>

        <div className="space-y-5">
          <h3 className="font-heading text-lg text-beige-light font-bold uppercase border-b border-beige-medium/20 pb-2">
            Social Links
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-beige-medium text-xs tracking-widest uppercase mb-1.5 font-semibold">
                Instagram URL
              </label>
              <input
                value={settings.social.instagram}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    social: { ...settings.social, instagram: e.target.value },
                  })
                }
                className="w-full bg-coffee-dark border border-beige-medium/30 text-beige-light px-3 py-2 text-sm font-heading focus:border-beige-medium focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-beige-medium text-xs tracking-widest uppercase mb-1.5 font-semibold">
                Pinterest URL
              </label>
              <input
                value={settings.social.pinterest}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    social: { ...settings.social, pinterest: e.target.value },
                  })
                }
                className="w-full bg-coffee-dark border border-beige-medium/30 text-beige-light px-3 py-2 text-sm font-heading focus:border-beige-medium focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-beige-medium text-xs tracking-widest uppercase mb-1.5 font-semibold">
                WhatsApp URL
              </label>
              <input
                value={settings.social.whatsapp}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    social: { ...settings.social, whatsapp: e.target.value },
                  })
                }
                className="w-full bg-coffee-dark border border-beige-medium/30 text-beige-light px-3 py-2 text-sm font-heading focus:border-beige-medium focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-beige-medium text-xs tracking-widest uppercase mb-1.5 font-semibold">
                TikTok URL
              </label>
              <input
                value={settings.social.tiktok}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    social: { ...settings.social, tiktok: e.target.value },
                  })
                }
                className="w-full bg-coffee-dark border border-beige-medium/30 text-beige-light px-3 py-2 text-sm font-heading focus:border-beige-medium focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-beige-medium text-xs tracking-widest uppercase mb-1.5 font-semibold">
                Twitter / X URL
              </label>
              <input
                value={settings.social.twitter}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    social: { ...settings.social, twitter: e.target.value },
                  })
                }
                className="w-full bg-coffee-dark border border-beige-medium/30 text-beige-light px-3 py-2 text-sm font-heading focus:border-beige-medium focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-beige-medium text-xs tracking-widest uppercase mb-1.5 font-semibold">
                Facebook URL
              </label>
              <input
                value={settings.social.facebook}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    social: { ...settings.social, facebook: e.target.value },
                  })
                }
                className="w-full bg-coffee-dark border border-beige-medium/30 text-beige-light px-3 py-2 text-sm font-heading focus:border-beige-medium focus:outline-none"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-coffee-accent text-beige-light px-8 py-3 text-xs tracking-[0.2em] uppercase font-semibold hover:bg-beige-warm hover:text-coffee-dark transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
}

export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("projects");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleToast = useCallback((message: string, type: "success" | "error") => {
    setToast({ message, type });
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await api<{ authenticated: boolean }>("/api/auth");
        if (!data.authenticated) {
          router.push("/admin/login");
        }
      } catch {
        router.push("/admin/login");
      }
    };
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth", { method: "DELETE" });
      router.push("/admin/login");
    } catch {
      router.push("/admin/login");
    }
  };

  useEffect(() => {
    const INACTIVITY_TIMEOUT = 30 * 60 * 1000;
    let timer: ReturnType<typeof setTimeout>;

    const resetTimer = async () => {
      clearTimeout(timer);
      timer = setTimeout(async () => {
        await fetch("/api/auth", { method: "DELETE" });
        router.push("/admin/login");
      }, INACTIVITY_TIMEOUT);
    };

    const events = ["mousedown", "mousemove", "keydown", "scroll", "touchstart", "click"];
    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      clearTimeout(timer);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-coffee-deep">
      <AdminNav tab={tab} setTab={setTab} onLogout={handleLogout} />

      <main className="max-w-6xl mx-auto px-6 py-10">
        {tab === "projects" && (
          <ProjectManager
            onToast={handleToast}
          />
        )}
        {tab === "email" && (
          <EmailManager
            onToast={handleToast}
          />
        )}
        {tab === "settings" && (
          <SettingsManager
            onToast={handleToast}
          />
        )}
      </main>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
