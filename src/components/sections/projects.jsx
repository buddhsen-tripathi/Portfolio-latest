"use client";

import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const Projects = ({ category, title, description, techstacks, status, link, preview }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-2xl border border-black/[0.06] bg-black/[0.02] transition-colors hover:bg-black/[0.04] dark:border-white/[0.06] dark:bg-white/[0.03] dark:hover:bg-white/[0.05]"
    >
      {preview && (
        <div className="p-2 pb-0">
          <div className="overflow-hidden rounded-lg border border-black/[0.06] bg-black dark:border-white/[0.06]">
            <Image
              src={preview}
              alt={`${title} preview`}
              width={400}
              height={250}
              className="w-full object-cover"
            />
          </div>
        </div>
      )}

      <div className="p-3 md:p-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[10px] font-medium text-muted-foreground md:text-[11px]">{category}</p>
          <Badge variant={status} className="ml-2">
            {status === "active" ? "Active" : "Discontinued"}
          </Badge>
        </div>

        <h1 className="mb-1.5 text-sm font-semibold md:text-base">{title}</h1>
        <p className="mb-3 text-[11px] leading-relaxed text-muted-foreground md:text-xs">{description}</p>

        <div className="flex flex-wrap gap-1">
          {techstacks.map((tech, index) => (
            <span
              key={index}
              className="rounded-full bg-black/[0.04] px-2 py-0.5 text-[10px] text-muted-foreground dark:bg-white/[0.06] md:px-2.5 md:text-[11px]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
};

export default Projects;
