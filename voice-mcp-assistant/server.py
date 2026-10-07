from mcp.server import MCPServer


# Create the MCP server
mcp = MCPServer("Voice Business MCP")


# Tool 1: Get company information
@mcp.tool()
def get_company_info(company: str) -> dict:
    """Get basic information about a company."""

    companies = {
        "apple": {
            "name": "Apple",
            "industry": "Technology",
            "country": "USA",
            "employees": 164000
        },
        "microsoft": {
            "name": "Microsoft",
            "industry": "Software",
            "country": "USA",
            "employees": 228000
        },
        "google": {
            "name": "Google",
            "industry": "Technology",
            "country": "USA",
            "employees": 181000
        }
    }

    company = company.lower().strip()

    if company in companies:
        return companies[company]

    return {
        "error": "Company not found"
    }


# Tool 2: Get product price
@mcp.tool()
def get_product_price(product: str) -> dict:
    """Get the price of a product."""

    products = {
        "laptop": 55000,
        "iphone": 70000,
        "keyboard": 2500,
        "mouse": 1200,
        "headphones": 3500
    }

    product = product.lower().strip()

    if product in products:
        return {
            "product": product,
            "price": products[product],
            "currency": "INR"
        }

    return {
        "error": "Product not found"
    }


# Tool 3: Check product stock
@mcp.tool()
def check_stock(product: str) -> dict:
    """Check product stock."""

    stock = {
        "laptop": 15,
        "iphone": 8,
        "keyboard": 35,
        "mouse": 50,
        "headphones": 20
    }

    product = product.lower().strip()

    if product in stock:
        return {
            "product": product,
            "available": stock[product] > 0,
            "quantity": stock[product]
        }

    return {
        "error": "Product not found"
    }


# Tool 4: Calculate total price
@mcp.tool()
def calculate_total(price: float, quantity: int) -> dict:
    """Calculate the total price."""

    total = price * quantity

    return {
        "price": price,
        "quantity": quantity,
        "total": total,
        "currency": "INR"
    }


# Start the MCP server
if __name__ == "__main__":
    mcp.run(transport="stdio")
    
    #added this comment to check git push
    