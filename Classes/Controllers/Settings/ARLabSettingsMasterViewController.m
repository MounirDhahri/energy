#import "ARLabSettingsMasterViewController.h"
#import "AROptions.h"
#import "ARLabSettingsNavController.h"
#import "ARLabSettingsSectionButton.h"
#import "ARToggleSwitch.h"


@interface ARLabSettingsMasterViewController ()
@property (weak, nonatomic) IBOutlet UIButton *settingsIcon;
@property (weak, nonatomic) IBOutlet UILabel *presentationModeLabel;

@property (weak, nonatomic) IBOutlet ARLabSettingsSectionButton *syncContentButton;

@property (weak, nonatomic) IBOutlet ARLabSettingsSectionButton *presentationModeButton;
@property (weak, nonatomic) IBOutlet UIView *presentationModeToggle;
@property (weak, nonatomic) IBOutlet ARLabSettingsSectionButton *editPresentationModeButton;

@property (weak, nonatomic) IBOutlet ARLabSettingsSectionButton *backgroundButton;
@property (weak, nonatomic) IBOutlet ARLabSettingsSectionButton *emailButton;

@property (weak, nonatomic) IBOutlet ARLabSettingsSectionButton *supportButton;
@property (weak, nonatomic) IBOutlet ARLabSettingsSectionButton *logoutButton;

@property (assign) BOOL presModeOn;

@end


@implementation ARLabSettingsMasterViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
    [self setupSettingsIcon];
    [self setupSectionButtons];
    self.presModeOn = NO;
    [self setPresentationModeLabelText:NSLocalizedString(@"Hides sensitive information when showing artworks to clients", @"Explanatory text for presentation mode setting")];
}

- (void)setupSectionButtons
{
    /// Sync settings
    [self.syncContentButton setTitle:NSLocalizedString(@"Sync Content", @"Title for sync settings button")];

    /// Presentation Mode settings
    [self.presentationModeButton setTitle:NSLocalizedString(@"Presentation Mode", @"Title for presentation mode toggle button")];
    [self.presentationModeButton hideChevron];

    ARToggleSwitch *toggle = [ARToggleSwitch buttonWithFrame:self.presentationModeToggle.frame];
    toggle.userInteractionEnabled = NO;
    [self.presentationModeButton addSubview:toggle];
    toggle.on = self.presModeOn;

    [self.editPresentationModeButton setTitle:NSLocalizedString(@"Edit Presentation Mode", @"Title for edit presentation mode settings button")];
    [self.editPresentationModeButton hideTopBorder];

    /// Miscellaneous settings
    [self.backgroundButton setTitle:NSLocalizedString(@"Background", @"Title for background settings button")];
    [self.emailButton setTitle:NSLocalizedString(@"Email", @"Title for email settings button")];
    [self.emailButton hideTopBorder];

    /// Intercom
    [self.supportButton setTitle:NSLocalizedString(@"Support", @"Title for support button")];
    [self.supportButton hideChevron];

    /// Logout
    [self.logoutButton setTitle:NSLocalizedString(@"Logout", @"Title for logout button")];
    [self.logoutButton hideChevron];
}

#pragma mark -
#pragma mark labels

- (void)setPresentationModeLabelText:(NSString *)string
{
    NSMutableAttributedString *attrString = [[NSMutableAttributedString alloc] initWithString:string];
    NSMutableParagraphStyle *style = [[NSMutableParagraphStyle alloc] init];
    [style setLineSpacing:5];
    [attrString addAttribute:NSParagraphStyleAttributeName value:style range:NSMakeRange(0, string.length)];
    [self.presentationModeLabel setAttributedText:attrString];
}

- (IBAction)presentationModeButtonPressed:(id)sender
{
    ARToggleSwitch *toggle = self.presentationModeButton.subviews.firstObject;
    toggle.on = !self.presModeOn;
    self.presModeOn = !self.presModeOn;
}


#pragma mark -
#pragma mark settings icon

- (void)setupSettingsIcon
{
    [self.settingsIcon setImage:[[UIImage imageNamed:@"settings_btn_whiteborder"] imageWithRenderingMode:UIImageRenderingModeAlwaysTemplate] forState:UIControlStateNormal];
    [self.settingsIcon setTintColor:UIColor.blackColor];
    [self.settingsIcon setBackgroundColor:UIColor.whiteColor];
}

- (IBAction)settingsIconPressed:(id)sender
{
    [self exitSettingsPanel];
}

#pragma mark -
#pragma mark exit strategies

- (void)exitSettingsPanel
{
    NSAssert([self.navigationController isKindOfClass:ARLabSettingsNavController.class], @"Master parent must be an ARLabSettingsNavController");
    [self.navigationController dismissViewControllerAnimated:NO completion:nil];
}

- (IBAction)ogSettingsButtonPressed:(id)sender
{
    [[NSUserDefaults standardUserDefaults] setBool:NO forKey:AROptionsUseLabSettings];
    [self exitSettingsPanel];
}


- (BOOL)prefersStatusBarHidden
{
    return YES;
}

@end
