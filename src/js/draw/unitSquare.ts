import { Program } from "../private/program";
import { IGeometry } from "./geometry";

/** @hidden */
export class UnitSquare implements IGeometry {
    public positionBuffer: WebGLBuffer;
    public uvBuffer: WebGLBuffer;
    public indexBuffer: WebGLBuffer;

    constructor(public gl: WebGLRenderingContext) {
        this.positionBuffer = this.buildVerticies(this.gl);
        this.uvBuffer = this.buildUVs(this.gl);
        this.indexBuffer = this.buildIndexBuffer(this.gl);
    }

    public draw(program: Program): void {
        program.setAttributeValue("aPosition", this.positionBuffer, 3, this.gl.FLOAT, false, 0, 0);
        program.setAttributeValue("aUV", this.uvBuffer, 2, this.gl.FLOAT, false, 0, 0);

        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        this.gl.drawElements(this.gl.TRIANGLE_STRIP, 4, this.gl.UNSIGNED_SHORT, 0);
    }

    public delete(): void {
        this.gl.deleteBuffer(this.positionBuffer);
        this.gl.deleteBuffer(this.uvBuffer);
        this.gl.deleteBuffer(this.indexBuffer);
    }

    private buildVerticies(gl: WebGLRenderingContext): WebGLBuffer {
        const vertices = [
            1.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            1.0, 0.0, 0.0,
            0.0, 0.0, 0.0,
        ];
        const buffer = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        return buffer;
    }

    private buildUVs(gl: WebGLRenderingContext): WebGLBuffer {
        const uvs = [
            1.0, 1.0,
            0.0, 1.0,
            1.0, 0.0,
            0.0, 0.0,
        ];
        const buffer = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvs), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        return buffer;
    }

    private buildIndexBuffer(gl: WebGLRenderingContext): WebGLBuffer {
        const indexes = [
            0, 1, 2, 3,
        ];
        const buffer = gl.createBuffer();

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexes), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        return buffer;
    }
}
