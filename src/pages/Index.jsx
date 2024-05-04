import { Box, Button, Container, Textarea, VStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { create } from "lib/openai";

const Index = () => {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSummarize = async () => {
    if (!text.trim()) return;
    setIsLoading(true);
    try {
      const response = await create({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: text },
        ],
        model: "gpt-3.5-turbo",
        instructions: "Provide a summary",
        temperature: 0.7,
        max_tokens: 150,
      });
      setSummary(response.choices[0].message.content);
    } catch (error) {
      console.error("Error summarizing text:", error);
      setSummary("Failed to generate summary.");
    }
    setIsLoading(false);
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={4}>
        <Text fontSize="xl" fontWeight="bold">
          Text Summarizer
        </Text>
        <Textarea placeholder="Enter your text here..." value={text} onChange={handleTextChange} size="lg" height="200px" />
        <Textarea placeholder="Enter system prompt here..." value={systemPrompt} onChange={(e) => setSystemPrompt(e.target.value)} size="lg" height="100px" />
        <Button onClick={handleSummarize} isLoading={isLoading} colorScheme="blue" size="lg">
          Summarize
        </Button>
        <Textarea placeholder="Summary will appear here..." value={summary} size="lg" height="200px" isReadOnly />
      </VStack>
    </Container>
  );
};

export default Index;
