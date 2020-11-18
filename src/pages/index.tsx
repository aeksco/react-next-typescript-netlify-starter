import * as React from "react";
import { Hello } from "../components/Hello";

export default function () {
  return (
    <div className="row">
      <h1>Next.js + TypeScript + Tailwind CSS Starter</h1>
      <p>SEO-friendly website starter backed by Netlify lambda functions</p>
      <Hello />
    </div>
  );
}
