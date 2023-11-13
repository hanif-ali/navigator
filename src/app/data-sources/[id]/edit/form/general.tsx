"use client";

import { Button } from "~/app/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/app/components/ui/card";
import { Input } from "~/app/components/ui/input";
import { Label } from "~/app/components/ui/label";
import Image from "next/image";
import { DATA_SOURCES } from "../constants";
import { cn } from "~/lib/utils";
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

export function DataSourceFormGeneralTab(props: Props) {
  const { data, isLoading, onChange, onSubmit, errors, formIsDirty } = props;
  return (
    <Card>
      <CardHeader>
        <CardTitle>General</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={data.name}
            onChange={partial(onChange, ["name"])}
          />
          <InputErrors errors={errors?.name?._errors} />
        </div>
        <div className="space-y-1">
          <Label htmlFor="username">Source Type</Label>
          <div className="flex flex-wrap gap-4">
            {DATA_SOURCES.map((d) => (
              <Button
                variant="ghost"
                className={cn("h-[70px] w-[70px]", {
                  outline: data.type === d.type,
                })}
                key={d.type}
              >
                <Image src={d.imageLink} alt={d.name} width="50" height="50" />
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="secondary" onClick={onSubmit} disabled={!formIsDirty}>
          Save
        </Button>
        <Button
          variant="default"
          onClick={partialRight(onSubmit, ["configuration"])}
          disabled={!formIsDirty}
        >
          Save and Next
        </Button>
        {isLoading && <Loading />}
      </CardFooter>
    </Card>
  );
}
