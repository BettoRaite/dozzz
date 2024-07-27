const canvas: HTMLCanvasElement | null = document.getElementById(
	"canvas-debug",
) as HTMLCanvasElement | null;

const ctxDebug = canvas?.getContext("2d");

if (!ctxDebug) {
	throw new TypeError("no debug context");
}
ctxDebug.fillStyle = "cyan";

export function clearDebugCanvas() {
	ctxDebug?.clearRect(0, 0, canvas?.width ?? 0, canvas?.height ?? 0);
}

export { ctxDebug };
