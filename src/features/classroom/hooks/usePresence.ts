import { useState, useEffect, useCallback, useRef } from "react";
import type { Member } from "../types/classroom";

const POLL_INTERVAL = 5000;

export function usePresence(initialMembers: Member[]) {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const simulatePoll = useCallback(() => {
    setMembers((prev) =>
      prev.map((m) => ({
        ...m,
        isOnline: Math.random() > 0.3 ? m.isOnline : !m.isOnline,
      }))
    );
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(simulatePoll, POLL_INTERVAL);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [simulatePoll]);

  const onlineMembers = members.filter((m) => m.isOnline);
  const onlineCount = onlineMembers.length;

  return { members, onlineMembers, onlineCount, setMembers };
}
