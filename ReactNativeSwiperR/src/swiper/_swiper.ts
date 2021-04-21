export function setPages(
    Pages: (React.ReactChild | React.ReactFragment | React.ReactPortal)[],
) {
    Pages.unshift(Pages[Pages.length - 1]);
    Pages.unshift(Pages[Pages.length - 2]);
    Pages.push(Pages[2]);
    Pages.push(Pages[3]);
}
