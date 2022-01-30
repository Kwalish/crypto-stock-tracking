const redisBullParser = (url) => {
  const [[, , password, host, port]] = [...(url.matchAll(/redis:\/\/:(([^@]*)@)?(.*?):(\d*)/g))];
  return { redis: { password, host, port } };
};

module.exports = redisBullParser;
