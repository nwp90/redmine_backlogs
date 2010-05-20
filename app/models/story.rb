class Story < Issue
    unloadable

    acts_as_list :scope => 'coalesce(cast(issues.fixed_version_id as char), \'\') = \'#{fixed_version_id}\' AND issues.parent_id is NULL'

    def self.product_backlog(project)
        return Story.find(:all,
                        :conditions => [
                            "parent_id is NULL
                            and tracker_id in (?)
                            and fixed_version_id is NULL
                            and (#{project.project_condition(true)})
                            and status_id in (?)",
                            Story.trackers,
                            IssueStatus.find(:all, :conditions => ["is_closed = ?", false]).collect {|s| "#{s.id}" }
                        ],
                        :order => 'position ASC',
                        :include => :project
                        )
    end

    def self.sprint_backlog(sprint, project)
        return Story.find(:all,
                        :conditions => [
                            "parent_id is NULL
                            and tracker_id in (?)
                            and fixed_version_id = ?
                            and (#{project.project_condition(true)})",
                            Story.trackers,
                            sprint.id
                        ],
                        :order => 'position ASC',
                        :include => :project
                        )
    end

    def self.trackers
        trackers = Setting.plugin_redmine_backlogs[:story_trackers]
        return [] if trackers == '' or trackers.nil?

        return trackers.map { |tracker| Integer(tracker) }
    end

    def set_points(p)
        self.init_journal(User.current)

        if p.nil? || p == '' || p == '-'
            self.update_attribute(:story_points, nil)
            return
        end

        if p.downcase == 's'
            self.update_attribute(:story_points, 0)
            return
        end

        p = Integer(p)
        if p >= 0
            self.update_attribute(:story_points, p)
            return
        end
    end

    def points_display(notsized='-')
        if story_points.nil?
            return notsized
        end

        if story_points == 0
            return 'S'
        end

        return story_points.to_s
    end
end
