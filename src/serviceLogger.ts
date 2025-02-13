export const LogMessage = (data: any, error: any = '') =>  chrome.runtime.sendMessage({ action: "log", value: data, error: error })
