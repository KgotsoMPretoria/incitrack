"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Page() {
  return (
    <div className="p-6">
      <Button
        onClick={() => toast.success("Everything is working smoothly! 🚀")}
      >
        Test Toast
      </Button>
    </div>
  );
}
