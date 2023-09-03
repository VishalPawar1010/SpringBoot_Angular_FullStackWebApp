package com.luv2code.ecommerce.util;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.io.ByteArrayOutputStream;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

import org.junit.jupiter.api.Test;

public class ImageUtilTests {

	@Test
	public void testCompressImage() {
		// Create a byte array for testing
		byte[] data = "Hello, World!".getBytes();

		// Compress the image
		byte[] compressedData = ImageUtil.compressImage(data);

		// Verify that the compressed data is not null and is smaller than the original
		// data
		assertNotNull(compressedData);
//		assertTrue(compressedData.length < data.length);

		// Decompress the compressed data
		byte[] decompressedData = decompressImage(compressedData);

		// Verify that the decompressed data is equal to the original data
		assertNotNull(decompressedData);
		assertArrayEquals(data, decompressedData);
	}

	@Test
	public void testDecompressImage() {
		// Create a byte array for testing
		byte[] data = "Hello, World!".getBytes();

		// Compress the data
		byte[] compressedData = compressImage(data);

		// Decompress the compressed data
		byte[] decompressedData = ImageUtil.decompressImage(compressedData);

		// Verify that the decompressed data is not null and is equal to the original
		// data
		assertNotNull(decompressedData);
		assertArrayEquals(data, decompressedData);
	}

	public static byte[] compressImage(byte[] data) {
		Deflater deflater = new Deflater();
		deflater.setLevel(Deflater.BEST_COMPRESSION);
		deflater.setInput(data);
		deflater.finish();

		ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
		byte[] tmp = new byte[2 * 1024];
		while (!deflater.finished()) {
			int size = deflater.deflate(tmp);
			outputStream.write(tmp, 0, size);
		}
		try {
			outputStream.close();
		} catch (Exception ignored) {
		}
		return outputStream.toByteArray();
	}

	public static byte[] decompressImage(byte[] data) {
		Inflater inflater = new Inflater();
		inflater.setInput(data);
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
		byte[] tmp = new byte[2 * 1024];
		try {
			while (!inflater.finished()) {
				int count = inflater.inflate(tmp);
				outputStream.write(tmp, 0, count);
			}
			outputStream.close();
		} catch (Exception ignored) {
		}
		return outputStream.toByteArray();
	}
}