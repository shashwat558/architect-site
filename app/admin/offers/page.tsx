"use client";

import { useEffect, useState } from "react";

interface Offer {
  id: string;
  title: string;
  description: string;
  link: string;
  ctaLabel: string;
  createdAt: string;
}

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    ctaLabel: "View all offers",
  });

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const res = await fetch("/api/offers");
      const data = await res.json();
      setOffers(data.offers || []);
    } catch (error) {
      console.error("Failed to fetch offers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingOffer ? `/api/offers/${editingOffer.id}` : "/api/offers";
      const method = editingOffer ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        fetchOffers();
        resetForm();
      } else {
        const error = await res.json();
        alert(error.error || "Failed to save offer");
      }
    } catch (error) {
      console.error("Failed to save offer:", error);
      alert("Failed to save offer");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this offer?")) return;

    try {
      const res = await fetch(`/api/offers/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchOffers();
      }
    } catch (error) {
      console.error("Failed to delete offer:", error);
    }
  };

  const handleEdit = (offer: Offer) => {
    setEditingOffer(offer);
    setFormData({
      title: offer.title,
      description: offer.description,
      link: offer.link,
      ctaLabel: offer.ctaLabel,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ title: "", description: "", link: "", ctaLabel: "View all offers" });
    setEditingOffer(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="px-4 sm:px-0">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Offers</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          {showForm ? "Cancel" : "Add Offer"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editingOffer ? "Edit Offer" : "Create Offer"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                rows={4}
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Link *
              </label>
              <input
                type="text"
                required
                value={formData.link}
                onChange={(e) =>
                  setFormData({ ...formData, link: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="/offers/special-offer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CTA Label
              </label>
              <input
                type="text"
                value={formData.ctaLabel}
                onChange={(e) =>
                  setFormData({ ...formData, ctaLabel: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="View all offers"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                {editingOffer ? "Update" : "Create"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {offers.length === 0 ? (
            <li className="px-6 py-8 text-center text-gray-500">
              No offers yet. Create your first offer!
            </li>
          ) : (
            offers.map((offer) => (
              <li key={offer.id}>
                <div className="px-6 py-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">
                        {offer.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-2">
                        {offer.description}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        Link: {offer.link} • CTA: {offer.ctaLabel}
                      </p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(offer)}
                        className="text-indigo-600 hover:text-indigo-900 px-3 py-1 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(offer.id)}
                        className="text-red-600 hover:text-red-900 px-3 py-1 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
