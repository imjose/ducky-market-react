import React from "react";

type Page = {
  params: { id: string };
};

export default function Page({ params }: Page) {
  return <div>Page</div>;
}
