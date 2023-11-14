"use client";

import { Button } from "~/app/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/app/components/ui/card";
import { DataSourceWithConfiguration } from "../utils";
import { api } from "~/trpc/react";
import { Loading } from "~/app/components/ui/loading";
import { InputErrors } from "~/app/components/ui/inputerrors";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import React, { useState } from "react";
import {
  ColumnDef,
  TableMeta,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { createPortal } from "react-dom";

interface Props {
  data: DataSourceWithConfiguration;
}

interface Schema {
  name: any;
  alias: any;
  description: any;
  columns: {
    name: any;
    alias: any;
    description: any;
  }[];
}

const editableCell: Partial<ColumnDef<any>> = {
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue();
    const [value, setValue] = React.useState(initialValue);
    const onBlur = () => {
      // @ts-ignore
      table.options.meta?.updateData(index, id, value);
    };

    React.useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return (
      <>
        <input
          value={value as string}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
          className="w-full border-none bg-transparent outline-none"
        />
      </>
    );
  },
};

// TODO: use prisma types here instead
export const columns: ColumnDef<Schema>[] = [
  {
    accessorKey: "columns",
    header: "Import",
    cell: ({
      renderValue,
      getValue,
      row: { index, toggleExpanded },
      column: { id },
    }) => {
      const [value, setValue] = React.useState(false);
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.checked);
        // @ts-ignore
        // table.options.meta?.updateData(index, id, e.target.checked);
        toggleExpanded();
      };
      const columnsTableContainer = document.getElementById(
        `columns-table-${index}`,
      );
      return (
        <>
          <input type="checkbox" checked={value} onChange={handleChange} />
          {value &&
            columnsTableContainer &&
            createPortal(
              <ColumnsTable data={getValue() as Schema["columns"]} />,
              columnsTableContainer,
            )}
        </>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "alias",
    header: "Alias",
    ...editableCell,
  },
  {
    accessorKey: "description",
    header: "Description",
    ...editableCell,
  },
];

export const DataSourceFormConnectionTab = (props: Props) => {
  const { data } = props;

  const {
    isFetching,
    data: fetchedTables,
    error,
  } = api.dataSource.connect.useQuery(
    { id: data.id },
    {
      refetchOnWindowFocus: false,
      retry: false,
    },
  );

  const table = useReactTable({
    data: fetchedTables ?? [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connect</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {isFetching && <Loading />}
        {error && <InputErrors errors={[error.message]} />}

        {fetchedTables && (
          <>
            <p>Please select tables belwo to import</p>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead colSpan={columns.length} className="text-center">
                      Database Tables
                    </TableHead>
                  </TableRow>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <>
                        <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && "selected"}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      </>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </CardContent>
      {fetchedTables && (
        <CardFooter className="flex gap-2">
          <Button variant="secondary">Import</Button>
          {/* <Loading /> */}
        </CardFooter>
      )}
    </Card>
  );
};

export const ColumnsTable = ({ data, updateData }: { data: Schema["columns"] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell colSpan={4} className="text-center">
            Select Columns to Import
          </TableCell>
        </TableRow>
        <TableRow>
            <TableCell>Import</TableCell>
            <TableCell>Column Name</TableCell>
            <TableCell>Column Details</TableCell>
            <TableCell>Column Description</TableCell>
          </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((columnDetails) => (
          <TableRow>
            <TableCell><input type="checkbox" /></TableCell>
            <TableCell>{columnDetails.name}</TableCell>
            <TableCell>{columnDetails.alias}</TableCell>
            <TableCell>{columnDetails.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
