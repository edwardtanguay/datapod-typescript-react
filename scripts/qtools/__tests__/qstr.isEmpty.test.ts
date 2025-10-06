/* eslint-disable @typescript-eslint/no-explicit-any */
// qstr.test.ts
import { describe, it, expect } from "vitest";
import { isEmpty } from "../qstr";

describe("isEmpty", () => {
	it("should return true for undefined", () => {
		expect(isEmpty(undefined as any)).toBe(true);
	});

	it("should return true for null", () => {
		expect(isEmpty(null as any)).toBe(true);
	});

	it("should return true for empty string", () => {
		expect(isEmpty("")).toBe(true);
	});

	it("should return true for whitespace-only string", () => {
		expect(isEmpty("   ")).toBe(true);
		expect(isEmpty("\t")).toBe(true);
		expect(isEmpty("\n")).toBe(true);
		expect(isEmpty("  \t\n  ")).toBe(true);
	});

	it("should return false for non-empty string", () => {
		expect(isEmpty("hello")).toBe(false);
		expect(isEmpty("a")).toBe(false);
	});

	it("should return false for string with content and whitespace", () => {
		expect(isEmpty("  hello  ")).toBe(false);
		expect(isEmpty("\thello\n")).toBe(false);
	});
});
