import APIRequest from "../APIRequest.js";

export async function getAppConfig() {
  try {
    // .well-known spec: https://github.com/Vroo/well-known-uri-appspecific/blob/main/well-known-uri-for-application-specific-purposes.txt
    // The config file should be named like the domain that the app is running on
    let hostname = window.location.hostname;
    let reversedHostname = hostname.split(".").reverse().join(".")

    const res = await new APIRequest(new Request('.well-known/appspecific/' + reversedHostname + '.json'))
      .produces('application/json')
      .send()
    return await res.json()
  } catch (error) {
    console.info("Could not get config. Falling back to standalone mode.");
    return {
      loginAvailable: false
    };
  }
}
