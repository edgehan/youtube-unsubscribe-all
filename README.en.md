[한국어](README.md) | **English**

# YouTube Unsubscribe All

A browser script that unsubscribes from all the YouTube channels you're subscribed to.
Nothing to install — just paste it into the Chrome DevTools Console.

> ⚠️ **Unsubscribing cannot be undone.** To resubscribe, you'll have to find and subscribe to each channel again.

## How to use

1. In Chrome, sign in with the account you want to clean up and open https://www.youtube.com/feed/channels
2. Open [`unsubscribe-all.js`](unsubscribe-all.js) and copy its entire contents.
3. Press `Cmd + Option + J` (Windows: `Ctrl + Shift + J`) to open the Console.
4. Paste it into the Console and press `Enter`.
   - If Chrome shows a paste warning, type `allow pasting` yourself, press Enter, then paste again.
5. The script scrolls to load your full list, then unsubscribes from one channel about every second. Progress is shown in the Console.

To stop partway, type this in the Console:

```js
window.stopUnsub = true
```

## How it works

- It only clicks channels that show a "Subscribed" button, so it never subscribes you to anything by mistake.
- It clicks "Subscribed" → "Unsubscribe" in the menu → "Unsubscribe" in the confirmation dialog.
- Works with both English and Korean YouTube interfaces.
- It only clicks buttons on the page and never sends any data anywhere.

## Notes

If YouTube changes its page layout, the script may stop working. If the Console keeps showing "Failed" or "Skipped", please open an issue.

Always review code yourself before pasting it into the Console. Pasting code from someone you don't know can let them take over your account.

## License

[MIT](LICENSE) © edgehan
