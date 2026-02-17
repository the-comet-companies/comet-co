import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const response = await fetch(
            "https://n8n-dtla-c914de1950b9.herokuapp.com/webhook/2f5b9741-ac4e-4d25-8417-f8bd17d0dcd9",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            }
        );

        if (response.ok) {
            return NextResponse.json({ success: true });
        } else {
            const errorText = await response.text();
            console.error("Webhook Error:", response.status, errorText);
            return NextResponse.json(
                { error: `Webhook failed: ${response.status} ${errorText}` },
                { status: response.status }
            );
        }
    } catch (error: any) {
        console.error("Proxy Error:", error);
        return NextResponse.json(
            { error: `Internal Server Error: ${error.message}` },
            { status: 500 }
        );
    }
}
