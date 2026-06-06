"use client";

import { useState } from "react";
import { useConfirm } from "../components/ConfirmModal";
import { toast } from "sonner";
import { IconPlus, IconPencil, IconTrash, IconX, IconTag } from "@tabler/icons-react";

interface Offer {
  id: string;
  title: string;
  description: string;
  link: string;
  ctaLabel: string;
  createdAt: Date;
  updatedAt: Date;
}

const emptyForm = () => ({ title: "", description: "", link: "", ctaLabel: "View all offers" });

export function OffersClient({ initialOffers }: { initialOffers: Offer[] }) {
  const [offers, setOffers] = useState<Offer[]>(initialOffers);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [formData, setFormData] = useState(emptyForm());
  const [confirmModal, confirm] = useConfirm();

  const set = (key: string, value: string) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const fetchOffers = async () => {
    const res = await fetch("/api/offers");
    const data = await res.json();
    setOffers(data.offers || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editingOffer ? `/api/offers/${editingOffer.id}` : "/api/offers";
      const method = editingOffer ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success(editingOffer ? "Offer updated!" : "Offer created!");
        await fetchOffers();
        resetForm();
      } else {
        const err = await res.json();
        toast.error(err.error || "Failed to save offer");
      }
    } catch {
      toast.error("Network error — please try again");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    const ok = await confirm({
      title: "Delete offer?",
      message: `"${title}" will be permanently deleted.`,
      confirmLabel: "Delete",
    });
    if (!ok) return;
    try {
      const res = await fetch(`/api/offers/${id}`, { method: "DELETE" });
      if (res.ok) {
        setOffers((prev) => prev.filter((o) => o.id !== id));
        toast.success("Offer deleted");
      } else {
        toast.error("Failed to delete offer");
      }
    } catch {
      toast.error("Network error — please try again");
    }
  };

  const handleEdit = (offer: Offer) => {
    setEditingOffer(offer);
    setFormData({ title: offer.title, description: offer.description, link: offer.link, ctaLabel: offer.ctaLabel });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setFormData(emptyForm());
    setEditingOffer(null);
    setShowForm(false);
  };

  return (
    <>
      {confirmModal}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Offers</h1>
          <p className="text-slate-500 text-sm mt-0.5">{offers.length} offer{offers.length !== 1 ? "s" : ""}</p>
        </div>
        <button
          onClick={() => (showForm ? resetForm() : setShowForm(true))}
          className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
            showForm ? "bg-slate-100 text-slate-700 hover:bg-slate-200" : "bg-slate-900 text-white hover:bg-slate-700"
          }`}
        >
          {showForm ? <><IconX size={16} /> Cancel</> : <><IconPlus size={16} /> Add Offer</>}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl ring-1 ring-slate-200 shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-5">
            {editingOffer ? "Edit Offer" : "New Offer"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Title <span className="text-red-500">*</span></label>
              <input type="text" required value={formData.title} onChange={(e) => set("title", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Description <span className="text-red-500">*</span></label>
              <textarea rows={4} required value={formData.description} onChange={(e) => set("description", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Link <span className="text-red-500">*</span></label>
              <input type="text" required value={formData.link} onChange={(e) => set("link", e.target.value)}
                placeholder="/offers/special-offer"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">CTA Label</label>
              <input type="text" value={formData.ctaLabel} onChange={(e) => set("ctaLabel", e.target.value)}
                placeholder="View all offers"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent" />
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={saving}
                className="px-5 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-700 disabled:opacity-50 transition-colors">
                {saving ? "Saving..." : editingOffer ? "Update Offer" : "Create Offer"}
              </button>
              <button type="button" onClick={resetForm}
                className="px-5 py-2.5 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-200 transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl ring-1 ring-slate-200 shadow-sm overflow-hidden">
        {offers.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            <IconTag className="mx-auto mb-3 text-slate-200" size={40} />
            <p className="font-medium">No offers yet</p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {offers.map((offer) => (
              <li key={offer.id} className="flex items-start gap-4 px-6 py-5 hover:bg-slate-50 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900">{offer.title}</p>
                  <p className="text-sm text-slate-500 mt-1 line-clamp-2">{offer.description}</p>
                  <p className="text-xs font-mono text-slate-400 mt-1 truncate">
                    {offer.link} · {offer.ctaLabel}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => handleEdit(offer)} title="Edit"
                    className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                    <IconPencil size={16} />
                  </button>
                  <button onClick={() => handleDelete(offer.id, offer.title)} title="Delete"
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <IconTrash size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
