"use client";

import SubTabBar from "./SubTabBar";

const TABS = [
  { label: "SE AUDIOTECHNIK 소개", href: "/about" },
  { label: "NEWS", href: "/about/news" },
  { label: "오시는 길", href: "/about/location" },
];

export default function AboutTabs() {
  return <SubTabBar tabs={TABS} rootHref="/about" />;
}
