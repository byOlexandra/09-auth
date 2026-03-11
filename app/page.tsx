"use client";

import Link from "next/link";
import css from "./page.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/clientApi";

export default function Home() {
  const { user } = useAuthStore();

  const { data } = useQuery({
    queryKey: ["notes", "", 1, "all"],
    queryFn: () => fetchNotes("", 1, "all"),
  });

  const ITEMS_PER_PAGE = 12;
  const estimatedQuantity = (data?.totalPages || 0) * ITEMS_PER_PAGE;

  const latestNoteDate =
    (data?.notes.length as number) > 0
      ? data?.notes.reduce((latest, current) => {
        return new Date(current.createdAt) > new Date(latest.createdAt)
          ? current
          : latest;
      }).createdAt
      : null;

  const formattedDate = latestNoteDate
    ? new Date(latestNoteDate).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    })
    : "No notes";

  return (
    <div className={css.wrapper}>
      <section className={css.hero}>
        <div className={css.glassCard}>
          <div className={css.badge}>Personal Workspace</div>

          <h1 className={css.title}>
            Welcome back,{" "}
            <span className={css.gradientText}>{user?.username}</span>
          </h1>

          <p className={css.tagline}>
            Your thoughts, <span className={css.highlight}>organized</span> and{" "}
            <span className={css.highlight}>accessible</span>. Streamline your
            productivity with a clean interface and smart search.
          </p>

          <div className={css.actions}>
            <Link href="/notes" className={css.btnPrimary}>
              Open My Notes
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="/notes/action/create" className={css.btnSecondary}>
              + Create New
            </Link>
          </div>
        </div>

        <div className={css.statsGrid}>
          <div className={css.statCard}>
            <span className={css.statValue}>~{estimatedQuantity}</span>
            <span className={css.statLabel}>Total notes</span>
          </div>
          <div className={css.statCard}>
            <span className={css.statValue}>5</span>
            <span className={css.statLabel}>Categories</span>
          </div>
          <div className={css.statCard}>
            <span className={css.statValue}>{formattedDate}</span>
            <span className={css.statLabel}>Last created</span>
          </div>
        </div>
      </section>
    </div>
  );
}
