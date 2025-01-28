export const LogMessage = (data: any) =>  chrome.runtime.sendMessage({ action: "log", value: data })
