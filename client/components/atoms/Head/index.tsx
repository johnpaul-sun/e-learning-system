import Head from "next/head";
import React from "react";

type Props = {
  title: string
  children?: any
}

const NextHead = (props:Props) => {
  const { title, children } = props;

  return (
    <Head>
      <title key="auth">{title}</title>
      {children}
    </Head>
  );
};

export default NextHead;
