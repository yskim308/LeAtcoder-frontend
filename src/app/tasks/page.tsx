"use client";

import { useState, useMemo, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Task, Difficulty, Status } from "./types";
import { api } from "@/lib/api";
import { useTokenStore } from "@/store/token-store";

// helper to map score -> difficulty label
const scoreToDifficulty = (score: number) => {
  if (score <= 200) return "Beginner";        // 0–200
  if (score <= 300) return "Easy";            // 201–300
  if (score <= 450) return "Medium";          // 301–450
  if (score <= 650) return "Hard";            // 451–650
  return "Expert";                            // 651+
};

type TasksResponse = Task[];

export default function TasksPage() {
  const [page, setPage] = useState(1);
  const [difficulty, setDifficulty] = useState<Difficulty>("all");
  const [status, setStatus] = useState<Status>("all");

  const accessToken = useTokenStore((s) => s.token);
  const lsToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const canFetch = !!(accessToken || lsToken);

  const params = useMemo(() => {
    const p: Record<string, string | number> = { page };
    if (difficulty !== "all") p.difficulty = difficulty;
    if (status !== "all") p.status = status;
    return p;
  }, [page, difficulty, status]);

  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["tasks", page, difficulty, status],
    enabled: canFetch,
    keepPreviousData: true,
    queryFn: async () => (await api.get<Task[]>("/tasks", { params })).data,
    retry: 1,
  });

  const queryClient = useQueryClient();
  useEffect(() => {
    const nextPage = page + 1;
    queryClient.prefetchQuery({
      queryKey: ["tasks", nextPage, difficulty, status],
      queryFn: async () =>
        (await api.get<TasksResponse>("/tasks", { params: { ...params, page: nextPage } })).data,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, difficulty, status, queryClient]);

  if (!canFetch) {
    return (
      <div className="w-full min-h-screen p-8">
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Problem Set</CardTitle>
            <CardDescription>Please sign in to view tasks.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-8">
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Problem Set</CardTitle>
          <CardDescription>Browse and solve coding challenges</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Filters */}
          <div className="flex gap-4">
            <select
              value={difficulty}
              onChange={(e) => {
                setPage(1);
                setDifficulty(e.target.value as Difficulty);
              }}
              className="border rounded px-3 py-2"
            >
              <option value="all">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
              <option value="expert">Expert</option>
            </select>

            <select
              value={status}
              onChange={(e) => {
                setPage(1);
                setStatus(e.target.value as Status);
              }}
              className="border rounded px-3 py-2"
            >
              <option value="all">All Problems</option>
              <option value="completed">Completed</option>
              <option value="uncompleted">Not Completed</option>
            </select>
          </div>

          {(isLoading || isFetching) && <p>Loading tasks...</p>}
          {isError && (
            <p className="text-red-600">Failed to load tasks: {(error as any)?.message ?? "unknown error"}</p>
          )}

          {/* Tasks table */}
          <div className="border rounded-lg">
            <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 font-semibold">
              <span>Problem</span>
              <span>Difficulty</span>
              <span>Score</span>
              <span>Status</span>
            </div>

            {(data ?? []).map((task) => (
              <div key={task._id} className="grid grid-cols-4 gap-4 p-4 border-t">
                <span className="text-blue-600 hover:underline cursor-pointer">
                  {task.taskName}
                </span>
                <span>{scoreToDifficulty(task.score)}</span>
                <span>{task.score}</span>
                <span>○</span>
              </div>
            ))}

            {data && data.length === 0 && !isLoading && (
              <div className="p-4 text-sm text-gray-500">No tasks found.</div>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || isFetching}
            >
              Previous
            </Button>
            <span className="flex items-center px-4">Page {page}</span>
            <Button variant="outline" onClick={() => setPage((p) => p + 1)} disabled={isFetching}>
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
