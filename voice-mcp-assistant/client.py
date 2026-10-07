import asyncio
from mcp import Client, StdioServerParameters


async def main():

    server = StdioServerParameters(
        command="python",
        args=["server.py"]
    )

    async with Client(server) as client:

        print("\nConnected to MCP server!")

        tools = await client.list_tools()

        print("\nAvailable MCP tools:")

        for tool in tools.tools:
            print("-", tool.name)

        print("\nTesting company tool...")

        result = await client.call_tool(
            "get_company_info",
            {"company": "Apple"}
        )

        print("\nResult:")
        print(result.content[0].text)


if __name__ == "__main__":
    asyncio.run(main())