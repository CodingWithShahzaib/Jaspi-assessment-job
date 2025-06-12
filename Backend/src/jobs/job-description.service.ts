import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class JobDescriptionService {
  private readonly logger = new Logger(JobDescriptionService.name);
  private readonly apiUrl = 'https://openrouter.ai/api/v1/chat/completions';
  
  constructor() {}

  async generateDescription(jobTitle: string): Promise<string> {
    try {
      const apiKey = process.env.OPENROUTER_API_KEY;
      
      if (!apiKey) {
        throw new HttpException('OPENROUTER_API_KEY is not set in environment variables', HttpStatus.INTERNAL_SERVER_ERROR);
      }

      const response = await axios.post(
        this.apiUrl,
        {
          model: 'deepseek/deepseek-r1-0528-qwen3-8b:free',
          messages: [
            {
              role: 'user',
              content: `Write a professional job description for a "${jobTitle}" position. Include responsibilities, qualifications, and required skills. Keep it concise and professional. it should be in the format of a job description. dont use markdown. make sure its only 200 characters.`,
            },
          ],
          max_tokens: 500,
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://jaspi-job-board.com', // Optional for OpenRouter stats
            'X-Title': 'Jaspi Job Board', // Optional for OpenRouter stats
          },
        },
      );

      return response.data.choices[0].message.content.trim();
    } catch (error) {
      this.logger.error(`Error generating job description: ${error.message}`);
      throw new HttpException(
        `Failed to generate job description: ${error.message}`, 
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
} 