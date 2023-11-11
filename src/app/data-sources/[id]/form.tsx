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
import { InputErrors } from "~/app/components/ui/inputerrors";
import { DataSourceFormGeneralTab } from "./form/general";
import { DataSourceFormConfigurationTab } from "./form/configuration";
import { DataSourceFormConnectionTab } from "./form/connection";

export function DataSourceForm(props: {
  dataSource: DataSourceWithConfiguration;
}) {
  const { dataSource } = props;

  const [data, setData] = useState(dataSource);
  const [errors, setErrors] = useState<any>(null);
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

  console.log(data);

  const onChangeConfiguration = (field: string, value: any) => {
    let config;
    if (!data.postgresConfig) {
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
    const result = dataSourceSchema.safeParse(data);
    if (!result.success) {
      console.log(result.error.format());
      setErrors(result.error.format());
      return;
    }
    await mutateAsync(data);
    setFormIsDirty(false);
    if (nextTab) router.push(`/data-sources/${dataSource.id}/?tab=${nextTab}`);
  };

  return (
    <Tabs defaultValue="general" className="mt-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="configuration">Configuration</TabsTrigger>
        <TabsTrigger value="connect">Connect</TabsTrigger>
      </TabsList>
      <TabsContent value="general">
        <DataSourceFormGeneralTab
          data={data}
          onChange={onChange}
          onSubmit={onSubmit}
          errors={errors}
          isLoading={isLoading}
          formIsDirty={formIsDirty}
        />
      </TabsContent>
      <TabsContent value="configuration">
        <DataSourceFormConfigurationTab
          data={data}
          onChange={onChangeConfiguration}
          onSubmit={onSubmit}
          errors={errors}
          isLoading={isLoading}
          formIsDirty={formIsDirty}
        />
      </TabsContent>
      <TabsContent value="connect">
        <DataSourceFormConnectionTab data={data} />
      </TabsContent>
    </Tabs>
  );
}
