'use client';
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    name: string;
    image: string;
    techStack: string;
    link: string;
    description?: string;
    features?: string[];
    challenges?: string[];
    learnings?: string[];
    live_link: string;
  };
  isVideo?: boolean;
}

const ProjectModal = ({ isOpen, onClose, project, isVideo =false }: ProjectModalProps) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-3xl w-[90vw] max-h-[90vh] overflow-y-auto bg-background">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-foreground">{project.name}</DialogTitle>
      </DialogHeader>

      <div className="mt-4">
        <div className="aspect-video relative rounded-lg overflow-hidden">
          {isVideo ? (
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              src={project.image}
            />
          ) : (
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover"
            />
          )}
        </div>

        <div className="mt-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Tech Stack</h3>
            <p className="text-muted-foreground">{project.techStack}</p>
          </div>

          {project.description && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Overview</h3>
              <p className="text-muted-foreground">{project.description}</p>
            </div>
          )}

          {project.features && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Key Features</h3>
              <ul className="list-disc list-inside text-muted-foreground">
                {project.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {project.challenges && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Challenges & Solutions</h3>
              <ul className="list-disc list-inside text-muted-foreground">
                {project.challenges.map((challenge, index) => (
                  <li key={index}>{challenge}</li>
                ))}
              </ul>
            </div>
          )}

          {project.learnings && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Key Learnings</h3>
              <ul className="list-disc list-inside text-muted-foreground">
                {project.learnings.map((learning, index) => (
                  <li key={index}>{learning}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex gap-4 mt-8">
          <a href={project.link} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="gap-2">
              <Github className="h-4 w-4" />
              View Code
            </Button>
          </a>
  { project.live_link? (  <a href={project.live_link} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </Button>
            </a>) :(null)}
          
       
        </div>
      </div>
    </DialogContent>
  </Dialog>
);

export default ProjectModal;
