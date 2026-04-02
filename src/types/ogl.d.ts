declare module "ogl" {
    export class Renderer {
        constructor(options?: { alpha?: boolean; premultipliedAlpha?: boolean });
        gl: WebGLRenderingContext & { canvas: HTMLCanvasElement };
        setSize(width: number, height: number): void;
        render(options: { scene: Mesh }): void;
    }
    export class Program {
        constructor(gl: WebGLRenderingContext, options: { vertex: string; fragment: string; uniforms: Record<string, { value: unknown }> });
        uniforms: Record<string, { value: unknown }>;
    }
    export class Mesh {
        constructor(gl: WebGLRenderingContext, options: { geometry: Triangle; program: Program });
    }
    export class Triangle {
        constructor(gl: WebGLRenderingContext);
    }
}
