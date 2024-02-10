import { RemoveUrlQueryParams, UrlQueryParams } from "@/types"
import qs from 'query-string'
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringify(
    {
      url: window.location.pathname,
      query: currentUrl
    },
    { skipNull: true }
  );
}

export function removeKeysFromQuery({ params, keysToRemove }: RemoveUrlQueryParams) {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach(key => {
    delete currentUrl[key];
  })

  return qs.stringify(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

export const formatDateTime = (dateTime: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
  };

  const formattedDateTime = new Date(dateTime).toLocaleString('en-US', options);
  return formattedDateTime;
};