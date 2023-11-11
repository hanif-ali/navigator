"use client";

import { Button } from "~/app/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/app/components/ui/card";
import { DataSourceWithConfiguration } from "../utils";

interface Props {
  data: DataSourceWithConfiguration;
}

export const DataSourceFormConnectionTab = (props: Props) => {
  const { data } = props;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Connect</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <Button>Test Connection</Button>
      </CardContent>
    </Card>
  );
};
