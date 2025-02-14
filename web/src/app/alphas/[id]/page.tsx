import React from "react";

function page({ params }: { params: { id: string } }) {
  const { id } = params;
  return <div>page: {id}</div>;
}

export default page;
