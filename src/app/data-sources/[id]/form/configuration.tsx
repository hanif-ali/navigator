"use client";

import { Button } from "~/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/app/components/ui/card";
import { Input } from "~/app/components/ui/input";
import { Label } from "~/app/components/ui/label";
import { Loading } from "~/app/components/ui/loading";
import { partial, partialRight } from "ramda";
import { DataSourceWithConfiguration } from "../utils";
import { InputErrors } from "~/app/components/ui/inputerrors";

interface Props {
  data: DataSourceWithConfiguration;
  isLoading: boolean;
  formIsDirty: boolean;
  errors?: any;

  onChange: (field: string, value: string) => void;
  onSubmit: (event: any, nextTab?: string) => void;
}

export const DataSourceFormConfigurationTab = (props: Props) => {
  const { data, isLoading, onChange, onSubmit, errors, formIsDirty } = props;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-2">
          <CardTitle>Server</CardTitle>
          <CardDescription>
            Specify how to connect to your data source
          </CardDescription>
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="current">Host</Label>
              <Input
                type="text"
                onChange={partial(onChange, ["host"])}
                value={data.postgresConfig?.host || ""}
              />
              <InputErrors errors={errors?.postgresConfig?.host?._errors} />
            </div>
            <div className="flex-1">
              <Label htmlFor="new">Port</Label>
              <Input
                type="number"
                onChange={partial(onChange, ["port"])}
                value={data.postgresConfig?.port || ""}
              />
              <InputErrors errors={errors?.postgresConfig?.port?._errors} />
            </div>
          </div>
          <div>
            <Label htmlFor="new">Database</Label>
            <Input
              type="text"
              onChange={partial(onChange, ["database"])}
              value={data.postgresConfig?.database || ""}
            />
            <InputErrors errors={errors?.postgresConfig?.database?._errors} />
          </div>
        </div>
        <div className="space-y-2">
          <CardTitle className="space-y-4">Authentication</CardTitle>
          <div>
            <Label htmlFor="new">Username</Label>
            <Input
              type="text"
              onChange={partial(onChange, ["user"])}
              value={data.postgresConfig?.user || ""}
            />
            <InputErrors errors={errors?.postgresConfig?.username?._errors} />
          </div>
          <div>
            <Label htmlFor="new">Password</Label>
            <Input
              type="password"
              onChange={partial(onChange, ["password"])}
              value={data.postgresConfig?.password || ""}
            />
            <InputErrors errors={errors?.postgresConfig?.password?._errors} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="secondary" onClick={onSubmit} disabled={!formIsDirty}>
          Save
        </Button>
        <Button
          variant="default"
          onClick={partialRight(onSubmit, ["connect"])}
          disabled={!formIsDirty}
        >
          Save and Next
        </Button>
        {isLoading && <Loading />}
      </CardFooter>
    </Card>
  );
};
