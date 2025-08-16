import httpInstance from "@/utils/http.js"

export const getCategory = () => {
  return httpInstance.get("home/category/head")
}
