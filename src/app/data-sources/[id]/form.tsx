"use client";

import { DataSource, PostgresConfiguration, Prisma } from "@prisma/client";
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/app/components/ui/tabs";
import Image from "next/image";
import { DATA_SOURCES } from "./constants";
import { cn } from "~/lib/utils";
import { useState } from "react";
import { Loading } from "~/app/components/ui/loading";
import { partial, partialRight } from "ramda";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { DataSourceWithConfiguration, dataSourceSchema } from "./utils";

export function DataSourceForm(props: {
  dataSource: DataSourceWithConfiguration;
}) {
  const { dataSource } = props;

  const [data, setData] = useState(dataSource);
  const [formIsDirty, setFormIsDirty] = useState(false);
  const router = useRouter();

  const { mutateAsync, isLoading } = api.dataSource.update.useMutation();

  const onChange = (field: string, value: any) => {
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    setFormIsDirty(true);
  };

  const onChangeConfiguration = (field: string, value: any) => {
    let config;
    if (data.postgresConfig) {
      config = {
        [field]: value,
      };
      data.postgresConfig;
    } else {
      config = {
        ...data.postgresConfig!,
        [field]: value,
      };
    }
    onChange("postgresConfig", config);
  };

  const onSubmit = async (event: any, nextTab?: string) => {
    dataSourceSchema.safeParse(data)?.errors?.errors?.reduce(
      (errors, error) =>
        error.path.reduce((a, b, level) => {
          if (level === error.path.length - 1) {
            a[b] = error.message;

            return errors;
          }

          if (!a[b]) {
            a[b] = {};
          }

          return a[b];
        }, errors),
      {} as { [key: string]: any },
    );
    const errors = dataSourceSchema.parse(data);
    console.log(errors);
    await mutateAsync(data);
    setFormIsDirty(false);
    if (nextTab) router.push(`/data-sources/${dataSource.id}/?tab=${nextTab}`);
  };

  return (
    <Tabs defaultValue="general" className="mt-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="connection">Connection</TabsTrigger>
        <TabsTrigger value="advanced">Advanced</TabsTrigger>
      </TabsList>
      <TabsContent value="general">
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
                  >
                    <Image
                      src={d.imageLink}
                      alt={d.name}
                      width="50"
                      height="50"
                    />
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button
              variant="secondary"
              onClick={onSubmit}
              disabled={!formIsDirty}
            >
              Save
            </Button>
            <Button
              variant="default"
              onClick={partialRight(onSubmit, ["connection"])}
              disabled={!formIsDirty}
            >
              Save and Next
            </Button>
            {isLoading && <Loading />}
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="connection">
        <Card>
          <CardHeader>
            <CardTitle>Connection</CardTitle>
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
                    onChange={partial(onChangeConfiguration, ["host"])}
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="new">Port</Label>
                  <Input type="number" />
                </div>
              </div>
              <div>
                <Label htmlFor="new">Database</Label>
                <Input
                  type="text"
                  onChange={partial(onChangeConfiguration, ["database"])}
                />
              </div>
            </div>
            <div className="space-y-2">
              <CardTitle className="space-y-4">Authentication</CardTitle>
              <div>
                <Label htmlFor="new">Username</Label>
                <Input type="text" />
              </div>
              <div>
                <Label htmlFor="new">Password</Label>
                <Input type="password" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="secondary"
              onClick={onSubmit}
              disabled={!formIsDirty}
            >
              Save
            </Button>
            <Button
              variant="default"
              onClick={partialRight(onSubmit, ["connection"])}
              disabled={!formIsDirty}
            >
              Save and Next
            </Button>
            {isLoading && <Loading />}
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="advanced">
        <Card>
          <CardHeader>
            <CardTitle>Advanced</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-2">
              <CardTitle>Server</CardTitle>
              <CardDescription>
                Specify how to connect to your data source
              </CardDescription>
              <div className="flex-1">
                <Label htmlFor="current">Host</Label>
                <Input type="text" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="secondary"
              onClick={onSubmit}
              disabled={!formIsDirty}
            >
              Save
            </Button>
            {isLoading && <Loading />}
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
