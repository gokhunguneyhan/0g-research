declare module "ogl" {
    export class Renderer {
        constructor(options?: { alpha?: boolean; premultipliedAlpha?: boolean; dpr?: number });
        gl: WebGLRenderingContext & { canvas: HTMLCanvasElement };
        dpr: number;
        setSize(width: number, height: number): void;
        render(options: { scene: Mesh }): void;
    }
    export class Program {
        constructor(gl: WebGLRenderingContext, options: { vertex: string; fragment: string; uniforms: any });
        uniforms: Record<string, { value: unknown }>;
    }
    export class Mesh {
        constructor(gl: WebGLRenderingContext, options: { geometry: Triangle; program: Program });
    }
    export class Triangle {
        constructor(gl: WebGLRenderingContext);
    }
}
