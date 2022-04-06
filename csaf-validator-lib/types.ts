declare module 'bcp47' {
  const bcp47: {
    parse: (tag: string) => {
      langtag: {
        language: {
          language: string | null
          extlang: string[]
        }
        script: string | null
        region: string | null
        variant: string[]
        extension: Array<{ singleton: string }>
        privateuse: string[]
      }
    } | null
  }

  export = bcp47
}

declare module 'cvss2js' {
  const cvss2js: {
    getBaseScore: (input: string) => number
    getTemporalScore: (input: string) => number
    getEnvironmentalScore: (input: string) => number
  }

  export = cvss2js
}
