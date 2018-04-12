export const propOverwrite = (overwrite, existing, incoming) => {
  return {
    ...(overwrite) ? existing : {},
    ...incoming,
    ...(!overwrite) ? existing : {}
  }
}

export default propOverwrite
