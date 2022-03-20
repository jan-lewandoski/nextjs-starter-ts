const stringUtils = {
  parseLink: (link: string) => {
    if (link.startsWith('https://') || link.startsWith('http://')) {
      return link
    }

    return `http://${link}`
  },
}

export default stringUtils
