import { NextResponse } from 'next/server';
import { testConnection } from '@/lib/db';

export async function GET() {
  try {
    const dbTime = await testConnection();
    return NextResponse.json({
      status: 'healthy',
      database: 'connected',
      timestamp: new Date().toISOString(),
      db_now: dbTime.now
    });
  } catch (error) {
    console.error('Health Check Failed:', error);
    return NextResponse.json({
      status: 'unhealthy',
      database: 'disconnected',
      error: String(error)
    }, { status: 503 });
  }
}
