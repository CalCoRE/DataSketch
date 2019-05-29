using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Security.Cryptography;
using System.IO;

namespace DataSketch.Web.Helpers
{
    public class Cryptography
    {
        private static byte[] _salt = Encoding.ASCII.GetBytes("o6806642kbM7c5");

        /// <summary>
        /// Encrypt the given string using AES.  The string can be decrypted using 
        /// DecryptStringAES().  The sharedSecret parameters must match.
        /// </summary>
        /// <param name="plainText">The text to encrypt.</param>
        /// <param name="sharedSecret">A password used to generate a key for encryption.</param>
        public static string EncryptStringAES(string plainText, string sharedSecret)
        {
            //Set up the encryption objects
            using (AesCryptoServiceProvider acsp = GetProvider(Encoding.Default.GetBytes(sharedSecret)))
            {
                byte[] sourceBytes = Encoding.ASCII.GetBytes(plainText);
                ICryptoTransform ictE = acsp.CreateEncryptor();

                //Set up stream to contain the encryption
                MemoryStream msS = new MemoryStream();

                //Perform the encrpytion, storing output into the stream
                CryptoStream csS = new CryptoStream(msS, ictE, CryptoStreamMode.Write);
                csS.Write(sourceBytes, 0, sourceBytes.Length);
                csS.FlushFinalBlock();

                //sourceBytes are now encrypted as an array of secure bytes
                byte[] encryptedBytes = msS.ToArray(); //.ToArray() is important, don't mess with the buffer

                //return the encrypted bytes as a BASE64 encoded string
                return Convert.ToBase64String(encryptedBytes);
            }
        }

        /// <summary>
        /// Decrypt the given string.  Assumes the string was encrypted using 
        /// EncryptStringAES(), using an identical sharedSecret.
        /// </summary>
        /// <param name="cipherText">The text to decrypt.</param>
        /// <param name="sharedSecret">A password used to generate a key for decryption.</param>
        public static string DecryptStringAES(string cipherText, string sharedSecret)
        {
            cipherText = cipherText.Replace(" ", "+");

            using (AesCryptoServiceProvider acsp = GetProvider(Encoding.Default.GetBytes(sharedSecret)))
            {
                byte[] RawBytes = Convert.FromBase64String(cipherText);
                ICryptoTransform ictD = acsp.CreateDecryptor();

                //RawBytes now contains original byte array, still in Encrypted state

                //Decrypt into stream
                MemoryStream msD = new MemoryStream(RawBytes, 0, RawBytes.Length);
                CryptoStream csD = new CryptoStream(msD, ictD, CryptoStreamMode.Read);
                //csD now contains original byte array, fully decrypted

                //return the content of msD as a regular string
                return (new StreamReader(csD)).ReadToEnd();
            }

        }

        /// <summary>
        /// Encrypt the given string using AES.  The string can be decrypted using 
        /// DecryptStringAES().  The sharedSecret parameters must match.
        /// </summary>
        /// <param name="plainText">The text to encrypt.</param>
        /// <param name="sharedSecret">A password used to generate a key for encryption.</param>
        public static string EncryptUnicodeStringAES(string plainText, string sharedSecret)
        {
            //Set up the encryption objects
            using (AesCryptoServiceProvider acsp = GetProvider(Encoding.Default.GetBytes(sharedSecret)))
            {
                byte[] sourceBytes = Encoding.UTF8.GetBytes(plainText);
                ICryptoTransform ictE = acsp.CreateEncryptor();

                //Set up stream to contain the encryption
                MemoryStream msS = new MemoryStream();

                //Perform the encrpytion, storing output into the stream
                CryptoStream csS = new CryptoStream(msS, ictE, CryptoStreamMode.Write);
                csS.Write(sourceBytes, 0, sourceBytes.Length);
                csS.FlushFinalBlock();

                //sourceBytes are now encrypted as an array of secure bytes
                byte[] encryptedBytes = msS.ToArray(); //.ToArray() is important, don't mess with the buffer

                //return the encrypted bytes as a BASE64 encoded string
                return Convert.ToBase64String(encryptedBytes);
            }
        }


        private static AesCryptoServiceProvider GetProvider(byte[] key)
        {
            AesCryptoServiceProvider result = new AesCryptoServiceProvider();
            result.BlockSize = 128;
            result.KeySize = 128;
            result.Mode = CipherMode.CBC;
            result.Padding = PaddingMode.PKCS7;

            result.GenerateIV();
            result.IV = new byte[] { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };

            byte[] RealKey = GetKey(key, result);
            result.Key = RealKey;
            // result.IV = RealKey;
            return result;
        }

        private static byte[] GetKey(byte[] suggestedKey, SymmetricAlgorithm p)
        {
            byte[] kRaw = suggestedKey;
            List<byte> kList = new List<byte>();

            for (int i = 0; i < p.LegalKeySizes[0].MinSize; i += 8)
            {
                kList.Add(kRaw[(i / 8) % kRaw.Length]);
            }
            byte[] k = kList.ToArray();
            return k;
        }

    }
}