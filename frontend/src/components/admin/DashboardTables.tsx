"use client";

import React, { useEffect, useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { apiFetch, Lead } from "@/utils/api";

export default function DashboardTables() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch<Lead[]>("/leads")
      .then((data) => {
        // Ensure data is an array before setting
        if (Array.isArray(data)) {
          setLeads(data);
        } else {
          setLeads([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch leads:", err);
        setLeads([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-[#0A0F1A] border border-white/5 rounded-xl overflow-hidden">
      <div className="p-6 border-b border-white/5 flex items-center justify-between">
        <div>
          <h3 className="font-heading text-lg text-white">Recent Leads</h3>
          <p className="text-brand-grey text-xs">Latest consultation requests</p>
        </div>
        <button className="text-brand-green text-sm font-medium hover:text-brand-green-light transition-colors">
          View All
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5">
              <th className="py-4 px-6 text-xs font-body font-medium text-brand-grey uppercase tracking-wider">Name</th>
              <th className="py-4 px-6 text-xs font-body font-medium text-brand-grey uppercase tracking-wider">Contact</th>
              <th className="py-4 px-6 text-xs font-body font-medium text-brand-grey uppercase tracking-wider">Service</th>
              <th className="py-4 px-6 text-xs font-body font-medium text-brand-grey uppercase tracking-wider">Status</th>
              <th className="py-4 px-6 text-xs font-body font-medium text-brand-grey uppercase tracking-wider">Date</th>
              <th className="py-4 px-6 text-xs font-body font-medium text-brand-grey uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-brand-grey">Loading leads...</td>
              </tr>
            ) : leads.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-brand-grey">No leads found.</td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-medium text-white text-sm">{lead.name}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-brand-grey-light">{lead.email}</div>
                    <div className="text-xs text-brand-grey">{lead.phone}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-white">{lead.service}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      lead.isRead ? "bg-brand-green/10 text-brand-green" : "bg-amber-500/10 text-amber-500"
                    }`}>
                      {lead.isRead ? "Read" : "Pending"}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-brand-grey-light">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-brand-grey hover:text-white transition-colors p-1 rounded hover:bg-white/10">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
