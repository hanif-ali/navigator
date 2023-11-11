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

interface Props {
  data: DataSourceWithConfiguration;
}

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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Select Table</TableHead>
                  <TableHead className="w-[100px]">Table Name</TableHead>
                  <TableHead className="w-[100px]">Navigator Alias</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fetchedTables.map((table, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">
                      <input type="checkbox" />
                    </TableCell>
                    <TableCell className="font-medium">
                      {table.table_name}
                    </TableCell>
                    <TableCell className="font-medium">
                      {table.table_name}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </CardContent>
      {fetchedTables && (
        <CardFooter className="flex gap-2">
          <Button variant="secondary">Create View</Button>
          {/* <Loading /> */}
        </CardFooter>
      )}
    </Card>
  );
};
