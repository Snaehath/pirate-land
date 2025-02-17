import * as React from "react";

import { cn } from "@/lib/utils";

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...properties }, reference) => (
  <div className="animate-fade-in relative w-full overflow-auto">
    <table
      ref={reference}
      className={cn(
        "animate-fade-in w-full caption-bottom border-border border-2 text-sm",
        className,
      )}
      {...properties}
    />
  </div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...properties }, reference) => (
  <thead
    ref={reference}
    className={cn("animate-fade-in [&_tr]:border-b", className)}
    {...properties}
  />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...properties }, reference) => (
  <tbody
    ref={reference}
    className={cn("animate-fade-in [&_tr:last-child]:border-0", className)}
    {...properties}
  />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...properties }, reference) => (
  <tfoot
    ref={reference}
    className={cn(
      "animate-fade-in border-t border-t-border bg-main font-base [&>tr]:last:border-b-0",
      className,
    )}
    {...properties}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...properties }, reference) => (
  <tr
    ref={reference}
    className={cn(
      "animate-fade-in border-b border-border text-mtext transition-colors bg-main font-base data-[state=selected]:bg-bw data-[state=selected]:text-mtext",
      className,
    )}
    {...properties}
  />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...properties }, reference) => (
  <th
    ref={reference}
    className={cn(
      "animate-fade-in h-12 px-4 text-left align-middle font-heading text-mtext [&:has([role=checkbox])]:pr-0",
      className,
    )}
    {...properties}
  />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...properties }, reference) => (
  <td
    ref={reference}
    className={cn(
      "animate-fade-in p-4 align-middle font-base [&:has([role=checkbox])]:pr-0",
      className,
    )}
    {...properties}
  />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...properties }, reference) => (
  <caption
    ref={reference}
    className={cn("animate-fade-in mt-4 text-sm text-mtext font-base", className)}
    {...properties}
  />
));
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
