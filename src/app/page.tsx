"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.location = "/login"
  }, [])

}
