import asyncio

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from mcp import Client, StdioServerParameters


app = FastAPI()


class MCPRequest(BaseModel):
    tool: str
    arguments: dict


async def call_mcp_tool(tool_name, arguments):

    server = StdioServerParameters(
        command="python",
        args=["server.py"]
    )

    async with Client(server) as client:

        result = await client.call_tool(
            tool_name,
            arguments
        )

        if result.content:
            return result.content[0].text

        return "No result returned"


@app.post("/mcp-call")
async def mcp_call(request: MCPRequest):

    result = await call_mcp_tool(
        request.tool,
        request.arguments
    )

    return {
        "result": result
    }


app.mount(
    "/",
    StaticFiles(directory="web", html=True),
    name="web"
)