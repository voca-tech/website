/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Configuração para os arquivos .well-known
        source: '/.well-known/:path*',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
