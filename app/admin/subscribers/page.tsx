"use client";

import { useEffect, useState } from "react";

interface Subscriber {
  id: string;
  email: string;
  createdAt: string;
}

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const res = await fetch("/api/subscribers");
      const data = await res.json();
      setSubscribers(data.subscribers || []);
    } catch (error) {
      console.error("Failed to fetch subscribers:", error);
    } finally {
      setLoading(false);
    }
  };

  const exportEmails = () => {
    const emails = subscribers.map((s) => s.email).join("\n");
    const blob = new Blob([emails], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().split("T")[0]}.txt`;
    a.click();
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Subscribers</h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Total: {subscribers.length} subscriber{subscribers.length !== 1 ? "s" : ""}
          </p>
        </div>
        {subscribers.length > 0 && (
          <button
            onClick={exportEmails}
            className="bg-indigo-600 text-white px-4 py-3 rounded-md hover:bg-indigo-700 self-start sm:self-auto min-h-11"
          >
            Export Emails
          </button>
        )}
      </div>

      <div className="bg-white shadow overflow-hidden rounded-md">
        <ul className="divide-y divide-gray-200">
          {subscribers.length === 0 ? (
            <li className="px-4 sm:px-6 py-8 text-center text-gray-500">
              No subscribers yet.
            </li>
          ) : (
            subscribers.map((subscriber) => (
              <li key={subscriber.id}>
                <div className="px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 break-all">
                      {subscriber.email}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Subscribed:{" "}
                      {new Date(subscriber.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <a
                    href={`mailto:${subscriber.email}`}
                    className="text-indigo-600 hover:text-indigo-900 text-sm self-start sm:self-auto"
                  >
                    Email
                  </a>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
